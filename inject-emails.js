const csv = require('csvtojson');
const mongoose = require('mongoose');

// 1. UPDATED CONNECTION STRING (Added 'jerseyzbd' as the database)
const MONGO_URI = "mongodb+srv://merayhanislam21_db_user:2f3ftqWBFOePQbeq@cluster0.bjbvxu2.mongodb.net/jerseyzbd?appName=Cluster0"; 

// 2. UPDATED MODEL (Matches 'memberv3' exactly from your screenshot)
const MemberV3 = mongoose.models.MemberV3 || mongoose.model('MemberV3', new mongoose.Schema({
  roll: String,
  email: String,
  name: String
}), 'memberv3'); 

async function startInjection() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB [jerseyzbd]...");

    // Using headers:false and output:csv to avoid header mismatch errors
    const rows = await csv({ noheader: false, output: "csv" }).fromFile("members.csv");
    
    console.log(`Processing ${rows.length - 1} members...`);

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const csvEmail = row[0].toString().trim().toLowerCase();
      const csvRoll = row[1].toString().trim();

      // THE FIX: Using a Regex that ignores spaces at the beginning or end of the DB roll
      const result = await MemberV3.findOneAndUpdate(
        { roll: { $regex: new RegExp(`^\\s*${csvRoll}\\s*$`) } }, 
        { $set: { email: csvEmail } },
        { new: true }
      );

      if (result) {
        console.log(`✅ Success: [${csvRoll}] -> [${csvEmail}] (Found: ${result.name})`);
      } else {
        console.log(`❌ Not Found in DB: Roll [${csvRoll}]`);
      }
    }

    console.log("\n--- INJECTION COMPLETE ---");
    process.exit(0);
  } catch (err) {
    console.error("Critical Error:", err);
    process.exit(1);
  }
}

startInjection();
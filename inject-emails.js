const csv = require('csvtojson');
const mongoose = require('mongoose');

const MONGO_URI = ""; 

// Updated to target 'memberv3' specifically
const MemberV3 = mongoose.models.MemberV3 || mongoose.model('MemberV3', new mongoose.Schema({
  roll: String,
  email: String,
  name: String
}, { strict: false }), 'memberv3'); 

async function startInjection() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB...");

    // Assuming your CSV is: Column1=Roll, Column2=Email
    const rows = await csv({ noheader: true }).fromFile("member.csv");
    
    let updated = 0;
    let skipped = 0;
    let notFound = 0;

    for (const row of rows) {
      const csvRoll = row.field1?.trim(); 
      const csvEmail = row.field2?.trim().toLowerCase();

      if (!csvRoll || csvRoll === "Mist Roll" || !csvEmail) continue;

      // Finding the document in the 'memberv3' collection
      const member = await MemberV3.findOne({ roll: csvRoll });

      if (member) {
        // Only update if the email field is missing, null, or empty string
        if (!member.email || member.email.trim() === "") {
          member.email = csvEmail;
          await member.save();
          console.log(`✅ UPDATED: ${member.name || 'No Name'} (${csvRoll})`);
          updated++;
        } else {
          console.log(`⏩ SKIPPED: ${member.name || csvRoll} already has email: ${member.email}`);
          skipped++;
        }
      } else {
        console.log(`❌ NOT FOUND: Roll [${csvRoll}] not found in memberv3 collection.`);
        notFound++;
      }
    }

    console.log(`
--- OPERATION COMPLETE ---
Records Updated: ${updated}
Skipped (Existing): ${skipped}
Rolls Not Found: ${notFound}
--------------------------`);

    process.exit(0);
  } catch (err) {
    console.error("Critical Error:", err);
    process.exit(1);
  }
}

startInjection();
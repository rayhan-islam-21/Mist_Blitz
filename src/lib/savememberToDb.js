import api from "./axios";

const saveMemberToDB = async (data) => {
    try {
        await api.post("/members", {
            name: data.name,
            roll: data.roll,
            techDept: data.techDept,
            nonTechDept: data.nonTechDept,
            image: data.image,
            linkedin: data.linkedin,
            position: data.position
        });


    }
    catch (err) {
        console.error("Axios error:", err);
        throw err;
    }
}
export default saveMemberToDB;
import api from "./axios";

const saveMemberToDB = async (member) => {
    try {
        await api.post("/members", {
            name: member.name || "No Name",
            roll: member.roll,
            dept: member.dept,
            image: member.image,
            linkedin: member.linkedin || "",
            position: member.position
        })
    }
    catch (err) {
        console.error("Axios error:", err);
        throw err;
    }
}
export default saveMemberToDB;
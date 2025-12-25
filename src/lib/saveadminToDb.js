import api from "./axios";

const saveAdminToDB = async (admin) => {
    try{
        await api.post("/admins", {
            name: admin.name || "No Name",
            email: admin.email, 
        });
    }
    catch (err) {
        console.error("Axios error:", err);
        throw err;
    }
}
export default saveAdminToDB;
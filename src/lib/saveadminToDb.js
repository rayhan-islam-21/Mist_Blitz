import api from "./axios";

const saveAdminToDB = async (admin) => {
    try {
        await api.post("/admin", {
            name: admin.name,
            email: admin.email,
            uid: admin.uid,
        });
    }
    catch (err) {
        console.error("Axios error:", err);
        throw err;
    }
}
export default saveAdminToDB;
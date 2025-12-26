import api from "@/lib/axios";

const saveEquipmentToDb = async (data) => {
    try{
        await api.post("/equipment", {
            name: data.name,
            quantity: data.quantity,
            image: data.image,
            ownerType: data.ownerType,
            category: data.category,
            bash: data.bash,
            memberName: data.memberName
        });
    }
    catch (err) {
        console.error("Axios error:", err);
        throw err;
    }
}

export default saveEquipmentToDb;
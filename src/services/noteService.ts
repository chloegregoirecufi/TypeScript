import axios from "axios"
import { API_URL } from "../constants/ApiConstant"

//méthode pour supprimer une note 
export const deleteNote = async (id:number):Promise<boolean> => {
    try {
        const response = await axios.delete(`${API_URL}/notes/${id}`);
        if(response.status === 204){
            return true
        }else{
            return false
        }
    } catch (error) {
        console.log(`Erreur lors de le suppression de la note : ${error}`);
        return false
    }
}
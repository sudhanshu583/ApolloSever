import users from "../../service/user.js";
const Mutation = {
    createTrainee:  (parent, { input: { name, email } }) => {
        const newId   = users.length;
        const newUser = { id: newId+1, name : name, email : email };
        users.push(newUser)
        return {data: newUser, message:"Trainee created successfully", status :200};
    },
    deleteTrainee:  (parent, { id }) => {
        let userExist = users.findIndex((user) => user.id == id);
        if(userExist > -1) {
            users.splice(userExist, 1);
            return {data: null, message:"Trainee deleted successfully", status :200};
        }else {
            return {data: null, message:"Trainee id not found", status :500};
        }
        
    },
    updateTrainee:  (parent, { id, input: { name, email } }) => {
        let userExist = users.findIndex((user) => user.id == id);
        if(userExist > -1) {
            users[userExist].name  = name;
            users[userExist].email = email;
            return {data: {id:id, name:name, email:email}, message:"Trainee updated successfully", status :200};
        } else {
            return {data: null, message:"Trainee id not found", status :500};
        }
        
    }
};
export default Mutation;
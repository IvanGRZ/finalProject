import {createUser, getUserById, getUserByEmail} from '../repositories/user/index.js'

class mongoAuth {

    async signUp(username, password, address, age, picture, name, phone){
        try{
            const newUser = {
                username,
                password,
                address,
                age,
                picture,
                name,
                phone
            }
            const userCreate = await createUser(newUser);

            return userCreate;
        }
        catch(error){
            console.log(error)
        }

    }

    async login(email, password){

        const user = await getUserByEmail(email);
        console.log(user);


        try {
            if (!user) {
                return false;
            }
            else {
                if(user.password == password){
                    return user;
                }
                else{
                    return false
                }
            }

        } catch (error) {
            console.log(error)
        }        
    }

    async findById(id){
        try{
            const doc = await getUserById(id);
            let user;

            if (!doc.exists) {
              console.log('No such document!');
            } else {
              user = doc.data()
              return user;
            }
    
        }
        catch(error){
            console.log(error)
        }
    }

}

export default mongoAuth;
class Github{
    constructor(){
        this.url = "https://api.github.com/users/";
    }
    async getGithubData(username){
        const responseUser = await fetch(this.url + username);
        const responeRepo = await fetch(this.url + username + "/repos");
        const userData = await responseUser.json();
        const repoData = await responeRepo.json();
        return {
            user : userData,
            repo : repoData
        }
    }
}
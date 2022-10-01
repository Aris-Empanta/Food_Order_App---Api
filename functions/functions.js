module.exports = {
    currentDate: () => {

        const getTwoDigits = (number) => { 

            return number > 9 ? number : '0' + number
        }        

        let date = new Date()

        let day = getTwoDigits( date.getDate() )

        let month = getTwoDigits( date.getMonth() + 1 )

        let hours = getTwoDigits( date.getHours() )

        let minutes = getTwoDigits( date.getMinutes() )

        let seconds = getTwoDigits( date.getSeconds() )

        date = day + "/" + month + "/" + date.getFullYear() +
                 " " + hours + ":" + minutes + ":" + seconds
                 
        return date
    }
}
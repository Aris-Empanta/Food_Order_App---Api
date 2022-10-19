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

        date = day + "/" + month + "/" + date.getFullYear() +
                 " " + hours + ":" + minutes
                 
        return date
    },
    invoiceName: (id) => {

        //We create a name for the invoice file, 
        //so random that might be imposible 
        //for a random person to find it.
        let randomNumber =  String( Date.now() )+ 
                            10000 * Math.floor(Math.random() * 10) +
                            1000 * Math.floor(Math.random() * 10) + 
                            100 * Math.floor(Math.random() * 10) + 
                            10 * Math.floor(Math.random() * 10) + 
                            Math.floor(Math.random() * 10) 

        let orderId = id < 10 ? '_000' + id :
                      id < 100 ? '_00' + id :
                      id < 1000 ? '_0' + id :
                      '_' + id

        return 'invoice' + randomNumber + orderId
    }
}



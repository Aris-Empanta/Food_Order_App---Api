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
    onlyDate: () => {

        const getTwoDigits = (number) => { 

            return number > 9 ? number : '0' + number
        }        

        let date = new Date()

        let day = getTwoDigits( date.getDate() )

        let month = getTwoDigits( date.getMonth() + 1 )

        date = day + "/" + month + "/" + date.getFullYear() 
                        
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
    },
    daysAgo: (days) => {

        //this function will return the date depending of the days ago
        //argument we put.
        const getTwoDigits = (number) => { 

            return number > 9 ? number : '0' + number
        }        

        let date = new Date()

        date.setDate(date.getDate() - days)
        
        let day = getTwoDigits( date.getDate() )

        let month = getTwoDigits( date.getMonth() + 1 )
        
        let year = date.getFullYear()
        
        date =  day + "/" + month + "/" + year
                        
        return date
    },
    getDayName: (day) => {

        //This function gives the date name if the argument date is
        //in a date format of this type: dd/mm/yyyy
        let date = day.split("/").reverse().join("/")              
        let newDate = new Date(date)
        newDate = newDate.getDay()

        let daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday',
                             'Wednesday', 'Thurday', 'Friday',
                             'Saturday']
        let dayName
        
        for( let i=0; i < daysOfTheWeek.length; i++ ) {

            if(i === newDate) dayName =  daysOfTheWeek[i] 
        }

        return dayName
    }
}
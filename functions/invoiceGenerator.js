const PDFDocument = require('pdfkit');
const fs = require('fs');
const onlyDate = require("./functions").onlyDate

module.exports = {
    createInvoice: (order, name, address,  invoice, orderTotalPrice) => {

        //We create a pdf invoice using the pdfkit library
        const doc = new PDFDocument();

        //The file it will be saved as
        doc.pipe(fs.createWriteStream('./invoices/' + invoice + '.pdf'));

        //The current date
        let date = onlyDate()

        //The entire invoice design below
        doc.fontSize('24')
        .font('Helvetica-Bold')
        .fillColor("#303030")
        .text('INVOICE', 60, 80 )

        doc.fontSize('12')
        .font('Helvetica-Bold')
        .fillColor("#303030")
        .text('ARIS RESTAURANT', 427, 80, { paragraphGap: 5 })

        doc.fontSize('12')
            .font('Helvetica')
            .fillColor("#303030")
            .text('Eptanisou 12', {align: 'right'})

        doc.fontSize('12')
            .font('Helvetica')
            .fillColor("#303030")
            .text('Kypseli, Athens', { align: 'right' })

        doc.fontSize('12')
            .font('Helvetica')
            .fillColor("#303030")
            .text('11256', { align: 'right' })

        doc.fontSize('12')
            .font('Helvetica')
            .fillColor("#303030")
            .text('Greece', { align: 'right' })

        doc.fontSize('12')
            .font('Helvetica')
            .fillColor("#303030")
            .text('210-3456-782', { align: 'right',
                                    paragraphGap: 50,
                                    lineBreak: true})

        doc.fontSize('13')
            .font('Helvetica')
            .fillColor("blue")
            .text('Billed to',  60, 250 )  

        doc.fontSize('13')
            .font('Helvetica')
            .fillColor("blue")
            .text('Date issued',  460, 250 )  

        doc.fontSize('12')
            .font('Helvetica')
            .fillColor('#303030')
            .text(name,  60, 270 )
            
        doc.fontSize('12')
            .font('Helvetica')
            .fillColor('#303030')
            .text(address,  60, 285, { width: 150 } )

        doc.fontSize('12')
            .font('Helvetica')
            .fillColor("#303030")
            .text(date,  460, 270 )  


        doc.fontSize('13')
            .font('Helvetica')
            .fillColor("blue")
            .text('Product', 60, 368)  

        doc.fontSize('13')
            .font('Helvetica')
            .fillColor("blue")
            .text('Qty', 390, 370)  

        doc.fontSize('13')
            .font('Helvetica')
            .fillColor("blue")
            .text('Price', 490, 370)  

        let verticalPosition = 410

        //The function to go to a new page if the order is too big
        const newPage = () => {

            verticalPosition = 100
            doc.addPage() 
        }

        for( let i = 0; i < order.length; i++ ) {

            doc.fontSize('12')
                .font('Helvetica')
                .fillColor("black")
                .text(order[i].name, 60, verticalPosition, { lineBreak: false })
                .fontSize('12')
                .font('Helvetica')
                .fillColor("black")
                .text(order[i].quantity, 395, verticalPosition, { lineBreak: false })
                .fontSize('12')
                .font('Helvetica')
                .fillColor("black")
                .text(order[i].price + " EUR", 490, verticalPosition, { lineBreak: false }) 

                verticalPosition < 690 ? verticalPosition += 30 :
                                                      newPage()
        }

        verticalPosition < 690 ? verticalPosition += 30 :
                                              newPage()

        let totalPrice = new String(orderTotalPrice)
        let totalPricePosition = 490 - (totalPrice.length - 1) * 5 

        doc.fontSize('13')
            .font('Helvetica')
            .fillColor("blue")
            .text('Total Price: ', 350, verticalPosition)
            .fontSize('12')
            .font('Helvetica')
            .fillColor("black")
            .text(orderTotalPrice + ' EUR', totalPricePosition, verticalPosition)

        doc.end()
    }
}
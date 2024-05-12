package com.adelina.MyTicket.service;

import com.adelina.MyTicket.model.Ticket;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import net.glxn.qrgen.QRCode;
import net.glxn.qrgen.image.ImageType;
//import net.glxn.qrgen.core.image.ImageType;
import org.springframework.stereotype.Service;

import com.itextpdf.text.pdf.PdfWriter;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

@Service
public class PdfGeneratorService {

    public void generateTicketPdf(Ticket ticket, String filePath) throws DocumentException {
        Document document = new Document(PageSize.A4);

        try (OutputStream outputStream = new FileOutputStream(filePath)) {
            PdfWriter writer = PdfWriter.getInstance(document, outputStream);
            document.open();
            PdfContentByte contentByte = writer.getDirectContent();

            document.setMargins(50, 50, 50, 50);

            Rectangle borderRectangle = new Rectangle(document.left(), document.top(), document.right(), document.bottom());
            borderRectangle.setBorder(Rectangle.BOX);
            borderRectangle.setBorderColor(BaseColor.BLACK);
            borderRectangle.setBorderWidth(5f);

            Paragraph ticketInfoParagraph = new Paragraph("Informatii bilet", new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD));
            ticketInfoParagraph.setAlignment(Element.ALIGN_CENTER);
            document.add(ticketInfoParagraph);
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(100);

            Date eventDate=ticket.getEvent().getEventDate();
            SimpleDateFormat sdf=new SimpleDateFormat("dd MM yyyy");
            String formattedDate=sdf.format(eventDate);


            // Add ticket details
            table.addCell(createCell("Id-ul biletului:", String.valueOf(ticket.getTicketId())));
            table.addCell(createCell("Numar loc:", String.valueOf(ticket.getSeat().getSeatNumber())));
            table.addCell(createCell("Numar rand:", String.valueOf(ticket.getSeat().getRowNumber())));
            table.addCell(createCell("Eveniment:", ticket.getEvent().getEventName()));
            table.addCell(createCell("Data:", formattedDate));
            table.addCell(createCell("Pret:", String.valueOf(ticket.getTicketPrice())));
            String qrText=generateTicketQRtext(ticket);
            BufferedImage qrImage=generateQrCodeImage(qrText);
            ByteArrayOutputStream baos=new ByteArrayOutputStream();
            ImageIO.write(qrImage,"png",baos);
            byte[] qrImageData=baos.toByteArray();
            Image itextImage=Image.getInstance(qrImageData);
            //table.addCell(createCell("", String.valueOf(itextImage)));


            document.add(table);


           document.add(itextImage);
            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {

        }
    }

    private String generateTicketQRtext(Ticket ticket){
        StringBuilder qrTextBuilder=new StringBuilder();
        qrTextBuilder.append("Tickte Id: ").append((ticket.getTicketId())).append("\n");
        qrTextBuilder.append("Event name :").append(ticket.getEvent().getEventName()).append("\n");
        qrTextBuilder.append("Event date:").append(ticket.getEvent().getEventDate()).append("\n");
        qrTextBuilder.append("Location:").append(ticket.getLocation().getLocationName()).append("\n");
        qrTextBuilder.append("Seat number:").append(ticket.getSeat().getSeatNumber()).append("\n");
        qrTextBuilder.append("Row number:").append(ticket.getSeat().getRowNumber()).append("\n");
        qrTextBuilder.append("Address: ").append(ticket.getLocation().getAddress()).append("\n");
        qrTextBuilder.append("Start time:").append(ticket.getEvent().getStartTime());
        return qrTextBuilder.toString();

    }

    private BufferedImage generateQrCodeImage(String qrText){
        try{
            ByteArrayOutputStream  outputStream= QRCode.from(qrText)
                    .withSize(150,150)
                    .to(ImageType.PNG)
                    .stream();
            byte[] qrImageData=outputStream.toByteArray();
            outputStream.close();

            ByteArrayInputStream inputStream=new ByteArrayInputStream(qrImageData);
            BufferedImage qrImage= ImageIO.read(inputStream);
            inputStream.close();
            return qrImage;
        }catch(IOException e){
            e.printStackTrace();
        }
        return null;
    }

    private PdfPCell createCell(String key, String value) {
        PdfPCell cell = new PdfPCell();
        cell.setBorder(Rectangle.NO_BORDER);
        cell.addElement(new Paragraph(key, new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD)));
        cell.addElement(new Paragraph(value, new Font(Font.FontFamily.HELVETICA, 12)));
        return cell;
    }


}

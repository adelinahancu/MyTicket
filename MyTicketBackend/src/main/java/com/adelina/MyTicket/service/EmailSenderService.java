package com.adelina.MyTicket.service;

import com.adelina.MyTicket.payload.EmailAttachment;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;

import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

    private final JavaMailSender javaMailSender;

    public void sendEmail(String to,String subject,String body){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom("adelina.hancu8@gmail.com");
        message.setTo(to);
        message.setText(body);
        message.setSubject(subject);
        javaMailSender.send(message);

        System.out.println("Email sent successfuly!");
    }

    public void sendMailWithAttachment(String to,
                                       String body,
                                       String subject,
                                       String filePath) throws MessagingException {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);

        mimeMessageHelper.setFrom("adelina.hancu8@gmail.com");

        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setText(body);
        mimeMessageHelper.setSubject(subject);
        FileSystemResource file=new FileSystemResource(new File(filePath));
        mimeMessageHelper.addAttachment(file.getFilename(),file);
        javaMailSender.send(mimeMessage);

        System.out.println("Mail with attachment sent successfully!");
    }

    public void sendMailWithAttachments(String to,String body,String subject,List<String>  filePaths) throws MessagingException {
        MimeMessage mimeMessage=javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage,true);

        mimeMessageHelper.setFrom("adelina.hancu8@gmail.com");
        mimeMessageHelper.setTo(to);
      //  body = "<br>" + body;
        mimeMessageHelper.setText( body, true);
        mimeMessageHelper.setSubject(subject);

        for(String filePath:filePaths){
            FileSystemResource file=new FileSystemResource(new File(filePath));
            mimeMessageHelper.addAttachment(file.getFilename(),file);
        }
        javaMailSender.send(mimeMessage);
        System.out.println("Mail with attachments sent successfully");

    }



}

package com.example.RoomRent.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String phone;
    private String message;

    private String ownerEmail;

    // ✅ This is the correct field to use
    private Long roomId;

    // ✅ You should also add roomTitle here if you want to store it
    // This is useful for the email body
    private String roomTitle;

    // DELETE the empty getRoomTitle() method.
    // Lombok will create all getters and setters for you.
}
package com.example.RoomRent.Repository;


import com.example.RoomRent.Entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}

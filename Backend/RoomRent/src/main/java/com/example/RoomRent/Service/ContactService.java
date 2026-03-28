package com.example.RoomRent.Service;


import com.example.RoomRent.Entity.Contact;

public interface ContactService {
    /**
     * Processes a new contact request by saving it to the database
     * and sending an email to the room owner.
     *
     * @param contact The contact details received from the frontend.
     */
    void processContactRequest(Contact contact);
}
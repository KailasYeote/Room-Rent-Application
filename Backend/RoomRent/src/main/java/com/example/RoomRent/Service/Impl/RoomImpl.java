package com.example.RoomRent.Service.Impl;

import com.example.RoomRent.Entity.Room;
import com.example.RoomRent.Repository.RoomRepo;
import com.example.RoomRent.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RoomImpl implements RoomService {
    private  final  RoomRepo roomRepo;

    @Autowired
    public RoomImpl(RoomRepo roomRepo) {
        this.roomRepo = roomRepo;
    }

    @Override
    public Room PutRoom(Room room) {
        return roomRepo.save(room);
    }

    @Override
    public List<Room> GetRoom() {
        return roomRepo.findAll();
    }

    @Override
    public Optional<Room> GetRoomById(Long id) {
        return roomRepo.findById(id);
    }

    @Override
    @Transactional
    public Room updateById(Long id, Room updateData) {
        Room roomToUpdate = roomRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));

        // Copy all text fields
        roomToUpdate.setTitle(updateData.getTitle());
        roomToUpdate.setDescription(updateData.getDescription());
        roomToUpdate.setAddress(updateData.getAddress());
        roomToUpdate.setCity(updateData.getCity());
        roomToUpdate.setState(updateData.getState());
        roomToUpdate.setPincode(updateData.getPincode());
        roomToUpdate.setPricePerMonth(updateData.getPricePerMonth());
        roomToUpdate.setOwnerEmail(updateData.getOwnerEmail());

        // --- ✅ 5. UPDATE MAP FIELDS ---
        roomToUpdate.setLatitude(updateData.getLatitude());
        roomToUpdate.setLongitude(updateData.getLongitude());
        // --- END OF UPDATE ---

        // Note: This method does not update photos.

        return roomRepo.save(roomToUpdate);
    }


    @Override
    @Transactional
    public void deletById(Long id) {
        Optional<Room> roomToDelete = roomRepo.findById(id);
        if (roomToDelete.isPresent()) {
            roomRepo.delete(roomToDelete.get());
        }
    }
}
package com.example.RoomRent.Service;

import com.example.RoomRent.Entity.Room;
import java.util.List;
import java.util.Optional;

public interface RoomService {
    Room PutRoom(Room room);
    List<Room> GetRoom();
    Optional<Room> GetRoomById(Long id);
    Room updateById(Long id,Room updatebyId);

    // ✅ CHANGED: This method no longer returns a Room
    void deletById(Long id);
}
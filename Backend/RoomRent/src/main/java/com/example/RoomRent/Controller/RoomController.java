package com.example.RoomRent.Controller;

import com.example.RoomRent.Entity.Room;
import com.example.RoomRent.Service.RoomService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Room/v1/sundari")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class RoomController {

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Room> addRoom(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("address") String address,
            @RequestParam("city") String city,
            @RequestParam("state") String state,
            @RequestParam("pincode") String pincode,
            @RequestParam("pricePerMonth") Double pricePerMonth,
            @RequestParam("ownerEmail") String ownerEmail,
            // --- ✅ 3. ADD NEW MAP PARAMS ---
            @RequestParam(value = "latitude", required = false) Double latitude,
            @RequestParam(value = "longitude", required = false) Double longitude,
            // --- END OF NEW PARAMS ---
            @RequestParam(value = "photoFiles", required = false) List<MultipartFile> photoFiles
    ) {
        try {
            List<String> photoUrls = new ArrayList<>();
            String uploadDir = "uploads/";

            // ... (photo saving logic is unchanged) ...
            if (photoFiles != null && !photoFiles.isEmpty()) {
                File dir = new File(uploadDir);
                if (!dir.exists()) dir.mkdirs();

                for (MultipartFile photoFile : photoFiles) {
                    if (photoFile != null && !photoFile.isEmpty()) {
                        String fileName = System.currentTimeMillis() + "_" + photoFile.getOriginalFilename();
                        Path filePath = Paths.get(uploadDir, fileName);
                        Files.copy(photoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                        photoUrls.add("/uploads/" + fileName);
                    }
                }
            }

            // Create Room object and set all fields
            Room room = new Room();
            room.setTitle(title);
            room.setDescription(description);
            room.setAddress(address);
            room.setCity(city);
            room.setState(state);
            room.setPincode(pincode);
            room.setPricePerMonth(pricePerMonth);
            room.setOwnerEmail(ownerEmail);
            room.setPhotoUrls(photoUrls);

            // --- ✅ 4. SET NEW MAP FIELDS ---
            room.setLatitude(latitude);
            room.setLongitude(longitude);
            // --- END OF SETTING FIELDS ---

            Room savedRoom = roomService.PutRoom(room);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }


    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        List<Room> rooms = roomService.GetRoom();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Room>> getRoomById(@PathVariable Long id) {
        return ResponseEntity.ok(roomService.GetRoomById(id));
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<Room> updateRoomById(@PathVariable Long id, @RequestBody Room updateData) {
        Room updated = roomService.updateById(id, updateData);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoomById(@PathVariable Long id) {
        roomService.deletById(id);
        return ResponseEntity.noContent().build();
    }
}
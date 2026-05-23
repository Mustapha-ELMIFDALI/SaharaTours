package ma.saharatours.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.saharatours.dto.TransportDTO;
import ma.saharatours.service.TransportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transports")
@RequiredArgsConstructor
public class TransportController {

    private final TransportService transportService;

    @GetMapping
    public ResponseEntity<List<TransportDTO>> getAll() {
        return ResponseEntity.ok(transportService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransportDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(transportService.getById(id));
    }

    @PostMapping
    public ResponseEntity<TransportDTO> create(@Valid @RequestBody TransportDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(transportService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransportDTO> update(@PathVariable Long id, @Valid @RequestBody TransportDTO dto) {
        return ResponseEntity.ok(transportService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        transportService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

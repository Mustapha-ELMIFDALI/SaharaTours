package ma.saharatours.service;

import ma.saharatours.dto.ActivityDTO;
import ma.saharatours.entity.Activity;
import ma.saharatours.repository.ActivityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("ActivityService – Unit Tests")
class ActivityServiceTest {

    @Mock private ActivityRepository activityRepository;

    @InjectMocks
    private ActivityService activityService;

    private Activity sample;
    private ActivityDTO sampleDTO;

    @BeforeEach
    void setUp() {
        sample = Activity.builder()
                .id(1L)
                .title("Randonnée Sahara")
                .category("Aventure")
                .price(350.0)
                .duration("3 jours")
                .difficulty("Modéré")
                .location("Merzouga")
                .maxPeople(12)
                .image("https://example.com/img.jpg")
                .rating(4.8)
                .reviews(120)
                .description("Une randonnée inoubliable dans le Sahara marocain.")
                .includes(List.of("Guide", "Repas", "Hébergement"))
                .build();

        sampleDTO = new ActivityDTO();
        sampleDTO.setId(1L);
        sampleDTO.setTitle("Randonnée Sahara");
        sampleDTO.setCategory("Aventure");
        sampleDTO.setPrice(350.0);
        sampleDTO.setDuration("3 jours");
        sampleDTO.setDifficulty("Modéré");
        sampleDTO.setLocation("Merzouga");
        sampleDTO.setMaxPeople(12);
        sampleDTO.setIncludes(List.of("Guide", "Repas", "Hébergement"));
    }

    // ── getAll ────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("getAll() – returns list of ActivityDTOs")
    void getAll_returnsMappedDTOs() {
        when(activityRepository.findAll()).thenReturn(List.of(sample));

        List<ActivityDTO> result = activityService.getAll();

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo("Randonnée Sahara");
        assertThat(result.get(0).getPrice()).isEqualTo(350.0);
    }

    @Test
    @DisplayName("getAll() – empty repository returns empty list")
    void getAll_emptyRepository_returnsEmptyList() {
        when(activityRepository.findAll()).thenReturn(List.of());

        assertThat(activityService.getAll()).isEmpty();
    }

    // ── getById ───────────────────────────────────────────────────────────────

    @Test
    @DisplayName("getById() – existing ID returns correct DTO")
    void getById_existingId_returnsDTO() {
        when(activityRepository.findById(1L)).thenReturn(Optional.of(sample));

        ActivityDTO result = activityService.getById(1L);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Randonnée Sahara");
        assertThat(result.getLocation()).isEqualTo("Merzouga");
    }

    @Test
    @DisplayName("getById() – unknown ID throws RuntimeException")
    void getById_unknownId_throwsException() {
        when(activityRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> activityService.getById(99L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("99");
    }

    // ── create ────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("create() – saves entity and returns DTO with generated ID")
    void create_savesAndReturnsDTO() {
        when(activityRepository.save(any(Activity.class))).thenReturn(sample);

        ActivityDTO result = activityService.create(sampleDTO);

        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("Randonnée Sahara");
        verify(activityRepository).save(any(Activity.class));
    }

    // ── update ────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("update() – existing activity updates fields and returns DTO")
    void update_existingActivity_updatesFields() {
        ActivityDTO updateDTO = new ActivityDTO();
        updateDTO.setTitle("Randonnée Sahara Updated");
        updateDTO.setPrice(400.0);
        updateDTO.setCategory("Aventure");
        updateDTO.setDuration("4 jours");
        updateDTO.setDifficulty("Difficile");
        updateDTO.setLocation("Zagora");
        updateDTO.setMaxPeople(8);

        when(activityRepository.findById(1L)).thenReturn(Optional.of(sample));
        when(activityRepository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        ActivityDTO result = activityService.update(1L, updateDTO);

        assertThat(result.getTitle()).isEqualTo("Randonnée Sahara Updated");
        assertThat(result.getPrice()).isEqualTo(400.0);
    }

    @Test
    @DisplayName("update() – unknown ID throws RuntimeException")
    void update_unknownId_throwsException() {
        when(activityRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> activityService.update(99L, sampleDTO))
                .isInstanceOf(RuntimeException.class);
    }

    // ── delete ────────────────────────────────────────────────────────────────

    @Test
    @DisplayName("delete() – existing ID deletes successfully")
    void delete_existingId_deletesSuccessfully() {
        when(activityRepository.existsById(1L)).thenReturn(true);

        assertThatCode(() -> activityService.delete(1L))
                .doesNotThrowAnyException();

        verify(activityRepository).deleteById(1L);
    }

    @Test
    @DisplayName("delete() – unknown ID throws RuntimeException")
    void delete_unknownId_throwsException() {
        when(activityRepository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> activityService.delete(99L))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("99");

        verify(activityRepository, never()).deleteById(any());
    }
}

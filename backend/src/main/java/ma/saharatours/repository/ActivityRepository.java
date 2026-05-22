package ma.saharatours.repository;

import ma.saharatours.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByCategory(String category);
    List<Activity> findByDifficulty(String difficulty);
}

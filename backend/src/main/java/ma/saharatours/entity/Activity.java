package ma.saharatours.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String category;
    private double price;
    private String duration;
    private String difficulty;
    private String location;
    private int maxPeople;

    @Column(length = 1000)
    private String image;

    private double rating;
    private int reviews;

    @Column(length = 2000)
    private String description;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "activity_includes", joinColumns = @JoinColumn(name = "activity_id"))
    @Column(name = "include_item")
    @OrderColumn(name = "idx")
    @Builder.Default
    private List<String> includes = new ArrayList<>();
}

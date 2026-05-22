package ma.saharatours.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "transports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String type;
    private int capacity;
    private double pricePerTrip;
    private Double pricePerDay;
    private boolean driver;
    private boolean ac;

    @Column(length = 1000)
    private String image;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "transport_features", joinColumns = @JoinColumn(name = "transport_id"))
    @Column(name = "feature")
    @OrderColumn(name = "idx")
    @Builder.Default
    private List<String> features = new ArrayList<>();
}

package ma.saharatours.dto;

import lombok.Data;
import java.util.List;

@Data
public class TransportDTO {
    private Long   id;
    private String name;
    private String type;
    private int    capacity;
    private double pricePerTrip;
    private Double pricePerDay;
    private boolean driver;
    private boolean ac;
    private String image;
    private List<String> features;
}

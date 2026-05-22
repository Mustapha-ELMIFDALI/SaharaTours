package ma.saharatours.dto;

import lombok.Data;
import java.util.List;

@Data
public class ActivityDTO {
    private Long   id;
    private String title;
    private String category;
    private double price;
    private String duration;
    private String difficulty;
    private String location;
    private int    maxPeople;
    private String image;
    private double rating;
    private int    reviews;
    private String description;
    private List<String> includes;
}

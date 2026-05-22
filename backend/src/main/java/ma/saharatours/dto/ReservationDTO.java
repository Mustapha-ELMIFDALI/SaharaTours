package ma.saharatours.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ReservationDTO {
    private Long      id;
    private Long      userId;
    private String    userName;
    private Long      itemId;
    private String    type;
    private String    itemName;
    private LocalDate date;
    private int       people;
    private double    total;
    private String    status;
    private String    createdAt;
}

package ma.saharatours.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String name;
    private String email;
    private String password;   // optional — only updated when non-blank
}

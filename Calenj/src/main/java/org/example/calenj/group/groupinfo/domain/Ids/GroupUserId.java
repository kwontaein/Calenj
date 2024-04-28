package org.example.calenj.group.groupinfo.domain.Ids;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@EqualsAndHashCode
//@Getter
//@Setter
//@Embeddable
public class GroupUserId implements Serializable {
    private UUID group;
    private String user;
}

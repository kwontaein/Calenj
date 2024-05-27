package org.example.calenj.group.groupinfo.domain.Ids;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.calenj.user.domain.UserEntity;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupUserId implements Serializable {
    private UUID group;
    private UserEntity user;
}

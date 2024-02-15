package org.example.calenj.Main.Repository;

import org.example.calenj.Main.DTO.GroupDTO;
import org.example.calenj.Main.domain.Group.GroupEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Integer> {

    //롬복의 @data 에 의한 생성자를 찾지 못함. + entity의 name을 지정한 경우 해당 name 값으로 select 해야함
    @Query("select new org.example.calenj.Main.DTO.GroupDTO( g.grouptitle, g.groupcreated) from Group_table g where g.groupcreater = : groupcreater")
    Optional<Collection<GroupDTO>> findbyGroupcreater(String groupcreater);
}

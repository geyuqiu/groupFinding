package com.dhbw.ase.service.mapper;

import com.dhbw.ase.domain.Group;
import com.dhbw.ase.service.dto.GroupDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Group} and its DTO {@link GroupDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GroupMapper extends EntityMapper<GroupDTO, Group> {
    @Named("topic")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "topic", source = "topic")
    GroupDTO toDtoTopic(Group group);
}

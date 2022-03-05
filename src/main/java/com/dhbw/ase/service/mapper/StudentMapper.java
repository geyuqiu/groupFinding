package com.dhbw.ase.service.mapper;

import com.dhbw.ase.domain.Student;
import com.dhbw.ase.service.dto.StudentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Student} and its DTO {@link StudentDTO}.
 */
@Mapper(componentModel = "spring", uses = { GroupMapper.class })
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {
    @Mapping(target = "group", source = "group", qualifiedByName = "topic")
    StudentDTO toDto(Student s);
}

package com.dhbw.ase.repository;

import com.dhbw.ase.domain.Group;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Group entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {}

package com.dhbw.ase.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.dhbw.ase.domain.Group} entity.
 */
public class GroupDTO implements Serializable {

    private Long id;

    private String description;

    private String topic;

    private Double grade;

    private Integer year;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Double getGrade() {
        return grade;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GroupDTO)) {
            return false;
        }

        GroupDTO groupDTO = (GroupDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, groupDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GroupDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", topic='" + getTopic() + "'" +
            ", grade=" + getGrade() +
            ", year=" + getYear() +
            "}";
    }
}

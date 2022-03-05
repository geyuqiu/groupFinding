package com.dhbw.ase.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Group.
 */
@Entity
@Table(name = "jhi_group")
public class Group implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "topic")
    private String topic;

    @Column(name = "grade")
    private Double grade;

    @OneToMany(mappedBy = "group")
    @JsonIgnoreProperties(value = { "group" }, allowSetters = true)
    private Set<Student> students = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Group id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return this.description;
    }

    public Group description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTopic() {
        return this.topic;
    }

    public Group topic(String topic) {
        this.setTopic(topic);
        return this;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public Double getGrade() {
        return this.grade;
    }

    public Group grade(Double grade) {
        this.setGrade(grade);
        return this;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }

    public Set<Student> getStudents() {
        return this.students;
    }

    public void setStudents(Set<Student> students) {
        if (this.students != null) {
            this.students.forEach(i -> i.setGroup(null));
        }
        if (students != null) {
            students.forEach(i -> i.setGroup(this));
        }
        this.students = students;
    }

    public Group students(Set<Student> students) {
        this.setStudents(students);
        return this;
    }

    public Group addStudent(Student student) {
        this.students.add(student);
        student.setGroup(this);
        return this;
    }

    public Group removeStudent(Student student) {
        this.students.remove(student);
        student.setGroup(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Group)) {
            return false;
        }
        return id != null && id.equals(((Group) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Group{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", topic='" + getTopic() + "'" +
            ", grade=" + getGrade() +
            "}";
    }
}

package org.example.calenj.Main.Repository;

import org.example.calenj.domain.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test,Integer> {
}

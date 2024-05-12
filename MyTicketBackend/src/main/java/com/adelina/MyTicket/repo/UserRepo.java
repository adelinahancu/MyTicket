package com.adelina.MyTicket.repo;

import com.adelina.MyTicket.dto.UserMonthlyStats;
import com.adelina.MyTicket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    @Query("SELECT new com.adelina.MyTicket.dto.UserMonthlyStats(" +
            "FUNCTION('DATE_TRUNC', 'month', u.createdAt), COUNT(u)) " +
            "FROM User u " +
            "GROUP BY FUNCTION('DATE_TRUNC', 'month', u.createdAt) " +
            "ORDER BY FUNCTION('DATE_TRUNC', 'month', u.createdAt)")
    List<UserMonthlyStats> findMonthlyNewUserStats();
}

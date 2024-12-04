package com.javaProject.Game.tic_tac_toe.controller;

import com.javaProject.Game.tic_tac_toe.entity.User;
import com.javaProject.Game.tic_tac_toe.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {


    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        try {
            // Ensure username and password are not null or empty
            if (user.getUsername() == null || user.getUsername().isEmpty() ||
                    user.getPassword() == null || user.getPassword().isEmpty()) {
                return "Error: Username and password cannot be empty.";
            }

            User savedUser = userService.register(user);
            return "User registered successfully with ID: " + savedUser.getId();
        } catch (Exception e) {
            return "Error: Unable to register. Username might already be taken.";
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        try {
            // Ensure username and password are not null or empty
            if (user.getUsername() == null || user.getUsername().isEmpty() ||
                    user.getPassword() == null || user.getPassword().isEmpty()) {
                return "Error: Username and password cannot be empty.";
            }

            User loggedInUser = userService.login(user.getUsername(), user.getPassword());
            return loggedInUser != null ? "Login successful!" : "Invalid username or password.";
        } catch (Exception e) {
            return "Error: Something went wrong during login.";
        }
    }
}

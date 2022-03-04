package dhbw.stuttgart.cicd.rest.controller;

import dhbw.stuttgart.cicd.CicdApplication;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = CicdApplication.class)
class GreetingControllerTest {

  @Autowired
  private GreetingController greetingController;

  private MockMvc greetingMockMvc;

  @BeforeEach
  void setUp() {
    this.greetingMockMvc = MockMvcBuilders
      .standaloneSetup(greetingController)
      .build();
  }

  @Test
  void greeting() throws Exception {
    String name = "Peter";

    greetingMockMvc.perform(
      get("/greeting")
      .param("name", name)
    )
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("$.content").value("Hello, " + name + "!"))     ;
  }
}

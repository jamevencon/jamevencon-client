module io.github.yeahx4.jamevenconclient {
    requires javafx.controls;
    requires javafx.fxml;


    opens io.github.yeahx4.jamevenconclient to javafx.fxml;
    exports io.github.yeahx4.jamevenconclient;
}
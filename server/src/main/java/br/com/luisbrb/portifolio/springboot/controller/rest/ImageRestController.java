package br.com.luisbrb.portifolio.springboot.controller.rest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.luisbrb.portifolio.springboot.controller.AuthenticationUtils;
import br.com.luisbrb.portifolio.springboot.controller.repositories.ImageRepository;
import br.com.luisbrb.portifolio.springboot.model.Constants;
import br.com.luisbrb.portifolio.springboot.model.ImageTypeEnum;
import br.com.luisbrb.portifolio.springboot.model.entities.ImageEntity;

@RestController
@RequestMapping("/api/image")
public class ImageRestController {
    
    private ImageRepository imageRepository;

    public ImageRestController(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }
    
    private String getFileExtension(String filename) {
        if (filename == null) {
            return null;
        }
        int dotIndex = filename.lastIndexOf(".");
        if (dotIndex >= 0) {
            return filename.substring(dotIndex + 1);
        }
        return "";
    }

    @PostMapping(path = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<ImageEntity>> save(@CookieValue(name = Constants.AUTH_COOKIE) String authCookie, @RequestPart("image") MultipartFile[] formData) throws IOException {
        if (!AuthenticationUtils.isLoggedIn(authCookie)) {
            return null;
        };

        List<ImageEntity> imageList = new ArrayList<>();
        for (MultipartFile image : formData) {
            ImageTypeEnum type = null;
            switch (getFileExtension(image.getOriginalFilename())) {
                case "png":
                    type = ImageTypeEnum.PNG;
                    break;
                case "jpeg":
                case "jpg":
                    type = ImageTypeEnum.JPEG;
                    break;
                case "svg":
                    type = ImageTypeEnum.SVG;
                    break;
                default:
                    return ResponseEntity.badRequest().build();
                     
            }
            
            imageList.add(new ImageEntity(null, image.getBytes(), type));
        }
        return ResponseEntity.ok(imageRepository.saveAll(imageList));
    }

    @GetMapping(path="") 
    public ResponseEntity<?> get(@RequestParam("id") Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        Optional<ImageEntity> image = imageRepository.findById(id);
        if (image.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        switch (image.get().getType()) {
            case JPEG:
                headers.add("Content-Type", MediaType.IMAGE_JPEG_VALUE);
                break;
            case PNG:
                headers.add("Content-Type", MediaType.IMAGE_PNG_VALUE);
                break;
            case SVG:
                headers.add("Content-Type", "image/svg+xml");
                break;
        }

        return ResponseEntity.ok().headers(headers).body(image.get().getImage());
    }
}

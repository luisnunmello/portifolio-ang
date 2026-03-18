package br.com.luisbrb.portifolio.springboot.service.discord;

import java.io.IOException;
import java.util.Collections;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import br.com.luisbrb.portifolio.springboot.service.LoggerService;
import br.com.luisbrb.portifolio.springboot.dao.entities.ContactEntity;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.MessageEmbed;
import net.dv8tion.jda.api.interactions.commands.build.Commands;
import net.dv8tion.jda.api.requests.restaction.CommandListUpdateAction;
import org.springframework.stereotype.Service;

@Service
@Getter
@Setter
@RequiredArgsConstructor
public class DiscordBotService {
    @Getter private JDA jda = null;

    @Value("${discord.channel:#{null}}")
    private String channel;

    @Value("${discord.user:#{null}}")
    private String user;

    @Value("${discord.token:#{null}}")
    private String token;

    @NonNull
    private LoggerService logger;

    @PreDestroy
    public void stop() {
        logger.info("Stopping discord bot");
        jda.shutdownNow();
    }

    @PostConstruct
    private void init() throws IOException {

        if (token == null) {
            logger.info("No discord token provided, ignoring discord bot");
            return;
        }

        jda = JDABuilder.createLight(token, Collections.emptyList()).build();

        CommandListUpdateAction commands = jda.updateCommands();

        commands.addCommands(
            Commands.slash("set-messages-channel", "Set this channel as the one to send contact messages from portifolio"),
            Commands.slash("set-user", "Set this user as the one to send ping when messages from portifolio")
        );
        commands.queue();
    }

    public void sendContactMessageChannel(ContactEntity contactEntity) {
        if (channel == null || user == null) {
            logger.info("Discord Channel or User is null, not sending message");
            return;
        }
        MessageEmbed embed = new EmbedBuilder().setAuthor(contactEntity.getName()).setDescription(contactEntity.getMessage()).setFooter("Email: " + contactEntity.getEmail() + " | Cellphone: " + contactEntity.getCellphone()).build();
        jda.getTextChannelById(channel).sendMessage("<@" + user + ">").setEmbeds(embed).queue();
    }
}

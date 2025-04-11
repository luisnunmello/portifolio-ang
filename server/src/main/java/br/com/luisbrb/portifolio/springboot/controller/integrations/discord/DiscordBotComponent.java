package br.com.luisbrb.portifolio.springboot.controller.integrations.discord;

import java.io.IOException;
import java.util.Collections;

import org.springframework.stereotype.Component;

import br.com.luisbrb.portifolio.springboot.controller.ConfigComponent;
import br.com.luisbrb.portifolio.springboot.controller.LoggerComponent;
import br.com.luisbrb.portifolio.springboot.controller.integrations.discord.listeners.SlashCommandListener;
import br.com.luisbrb.portifolio.springboot.model.entities.ContactEntity;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.Getter;
import lombok.Setter;
import net.dv8tion.jda.api.EmbedBuilder;
import net.dv8tion.jda.api.JDA;
import net.dv8tion.jda.api.JDABuilder;
import net.dv8tion.jda.api.entities.MessageEmbed;
import net.dv8tion.jda.api.interactions.commands.build.Commands;
import net.dv8tion.jda.api.requests.restaction.CommandListUpdateAction;

@Component
public class DiscordBotComponent {
    @Getter private JDA jda;

    @Getter @Setter private String channelId;
    @Getter @Setter private String userId;

    private ConfigComponent configComponent;

    private LoggerComponent logger;

    public DiscordBotComponent(ConfigComponent configComponent, LoggerComponent loggerComponent) {
        this.configComponent = configComponent;
        this.logger = loggerComponent;
    }

    @PreDestroy
    public void stop() {
        logger.info("Stopping discord bot");
        jda.shutdownNow();
    }

    @PostConstruct
    private void init() throws IOException {
        setChannelId(configComponent.getProperty("discord.channel"));
        setUserId(configComponent.getProperty("discord.user"));
        
        if (configComponent.getProperty("discord.token") == null) {
            logger.info("No discord token provided, ignoring discord bot");
            return;
        }

        jda = JDABuilder.createLight(configComponent.getProperty("discord.token"), Collections.emptyList()).addEventListeners(new SlashCommandListener(this, configComponent)).build();

        CommandListUpdateAction commands = jda.updateCommands();

        commands.addCommands(
            Commands.slash("set-messages-channel", "Set this channel as the one to send contact messages from portifolio"),
            Commands.slash("set-user", "Set this user as the one to send ping when messages from portifolio")
        );
        commands.queue();
    }

    public void sendContactMessageChannel(ContactEntity contactEntity) {
        if (getChannelId() == null || getUserId() == null) {
            logger.info("Discord Channel or User is null, not sending message");
            return;
        }
        MessageEmbed embed = new EmbedBuilder().setAuthor(contactEntity.getName()).setDescription(contactEntity.getMessage()).setFooter("Email: " + contactEntity.getEmail() + " | Cellphone: " + contactEntity.getCellphone()).build();
        jda.getTextChannelById(channelId).sendMessage("<@" + getUserId() + ">").setEmbeds(embed).queue();
    }
}

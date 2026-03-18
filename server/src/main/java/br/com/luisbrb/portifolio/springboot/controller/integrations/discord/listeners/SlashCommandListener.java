package br.com.luisbrb.portifolio.springboot.controller.integrations.discord.listeners;

import java.util.logging.Logger;

import br.com.luisbrb.portifolio.springboot.service.ConfigService;
import br.com.luisbrb.portifolio.springboot.controller.integrations.discord.DiscordBotComponent;
import net.dv8tion.jda.api.events.interaction.command.SlashCommandInteractionEvent;
import net.dv8tion.jda.api.hooks.ListenerAdapter;
public class SlashCommandListener extends ListenerAdapter {
    private DiscordBotComponent discordBot;
    private ConfigService configService;

    public SlashCommandListener(DiscordBotComponent discordBot, ConfigService configService) {
        this.discordBot = discordBot;
        this.configService = configService;
    }

    public void setMessagesChannel(SlashCommandInteractionEvent event) {
        event.deferReply().queue();

        String channel = event.getChannelId();
        configService.setProperty("discord.channel", channel);
        event.getHook().sendMessage("Setting this channel " + channel + " to receive interactions").queue();
        discordBot.setChannelId(channel);
    }

    public void setUserToPing(SlashCommandInteractionEvent event) {
        event.deferReply().queue();
        
        String userId = event.getUser().getId();
        configService.setProperty("discord.user", userId);
        event.getHook().sendMessage("Setting this user " + userId + " to receive interactions").queue();
        discordBot.setUserId(userId);
    }

    @Override
    public void onSlashCommandInteraction(SlashCommandInteractionEvent event) {
        Logger.getAnonymousLogger().info(event.getName());
        switch (event.getName()) {
            case "set-messages-channel":
                setMessagesChannel(event);
                break;
            case "set-user":
                setUserToPing(event);
                break;
            default:
                break;
        }
    }
}

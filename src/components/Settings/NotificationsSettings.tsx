import React, { useState } from 'react';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';

interface NotificationChannel {
  id: string;
  name: string;
  icon: string;
  connected?: boolean;
}

interface NotificationState {
  sound: boolean;
  browser: boolean;
}

const channels: NotificationChannel[] = [
  { id: 'email', name: 'Email', icon: '✉️' },
  { id: 'chat', name: 'Chat', icon: '💬' },
  { id: 'phone', name: 'Phone', icon: '📱', connected: false },
  { id: 'sms', name: 'SMS', icon: '📱' },
  { id: 'facebook', name: 'Facebook', icon: 'f', connected: false },
  { id: 'instagram', name: 'Instagram', icon: '📸', connected: false },
  { id: 'whatsapp', name: 'WhatsApp', icon: '📱', connected: false },
  { id: 'yelp', name: 'Yelp', icon: 'Y', connected: false },
  { id: 'aircall', name: 'Aircall', icon: '📞', connected: false },
  { id: 'other', name: 'Other', icon: '🔔' },
];

const ticketEvents = [
  { id: 'chat', name: 'Chat & messaging tickets' },
  { id: 'internal', name: 'Mentioned in an internal note' },
  { id: 'snooze', name: 'Snooze expired' },
  { id: 'assigned', name: 'Assigned to a ticket' },
];

export const NotificationsSettings: React.FC = () => {
  const [volume, setVolume] = useState(75);
  const [ticketNotifications, setTicketNotifications] = useState<Record<string, NotificationState>>(
    Object.fromEntries(
      ticketEvents.map(event => [
        event.id,
        { sound: false, browser: false }
      ])
    )
  );
  const [channelNotifications, setChannelNotifications] = useState<Record<string, NotificationState>>(
    Object.fromEntries(
      channels.map(channel => [
        channel.id,
        { sound: false, browser: false }
      ])
    )
  );

  const handleTicketToggle = (eventId: string, type: keyof NotificationState) => {
    setTicketNotifications(prev => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        [type]: !prev[eventId][type]
      }
    }));
  };

  const handleChannelToggle = (channelId: string, type: keyof NotificationState) => {
    setChannelNotifications(prev => ({
      ...prev,
      [channelId]: {
        ...prev[channelId],
        [type]: !prev[channelId][type]
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-1">Volume control</h2>
          <p className="text-sm text-gray-500 mb-4">
            This control changes the volume for all active notifications.
          </p>
          <div className="flex items-center gap-4 w-96">
            <span className="text-gray-500">🔈</span>
            <Slider
              value={[volume]}
              onValueChange={(value) => setVolume(value[0])}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-gray-500">🔊</span>
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Ticket updates</h2>
          <p className="text-sm text-gray-500 mb-4">
            Get notified when one of these events happen:
          </p>

          <div className="space-y-4">
            {ticketEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between">
                <Label htmlFor={event.id}>{event.name}</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`${event.id}-sound`}>Classic</Label>
                    <Switch
                      id={`${event.id}-sound`}
                      checked={ticketNotifications[event.id]?.sound}
                      onCheckedChange={() => handleTicketToggle(event.id, 'sound')}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id={`${event.id}-browser`}
                      checked={ticketNotifications[event.id]?.browser}
                      onCheckedChange={() => handleTicketToggle(event.id, 'browser')}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">New messages</h2>
          <p className="text-sm text-gray-500 mb-4">
            Get notified when you receive new messages from these channels.
          </p>

          <div className="space-y-4">
            {channels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 flex items-center justify-center">
                    {channel.icon}
                  </span>
                  <Label htmlFor={channel.id}>{channel.name}</Label>
                  {channel.connected === false && (
                    <span className="text-xs text-gray-500">(Not connected)</span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`${channel.id}-sound`}>Classic</Label>
                    <Switch
                      id={`${channel.id}-sound`}
                      checked={channelNotifications[channel.id]?.sound}
                      onCheckedChange={() => handleChannelToggle(channel.id, 'sound')}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id={`${channel.id}-browser`}
                      checked={channelNotifications[channel.id]?.browser}
                      onCheckedChange={() => handleChannelToggle(channel.id, 'browser')}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};
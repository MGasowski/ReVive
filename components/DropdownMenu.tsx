import { View, Text } from 'react-native';
import React from 'react';
import * as Dropdown from 'zeego/dropdown-menu';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type Props = {
  items: Array<{
    key: string;
    title: string;
    icon: string;
    iconAndroid?: string;
  }>;
  onSelect: (useCamera: boolean) => Promise<void>;
};
const DropdownMenu = ({ items, onSelect }: Props) => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger>
        <MaterialIcons name="camera-alt" size={50} color="gray" />
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Label> Select image source</Dropdown.Label>
        <Dropdown.Item key="0" onSelect={() => onSelect(false)}>
          <Dropdown.ItemTitle>Photos library</Dropdown.ItemTitle>
        </Dropdown.Item>
        <Dropdown.Item key="1" onSelect={() => onSelect(true)}>
          <Dropdown.ItemTitle>Camera</Dropdown.ItemTitle>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default DropdownMenu;

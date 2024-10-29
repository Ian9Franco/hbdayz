import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Birthday } from '../../page';

interface UserSidebarProps {
  birthdays: Birthday[];
  handleSelectUser: (birthday: Birthday) => void;
  t: (key: string) => string;
}

export default function UserSidebar({ birthdays, handleSelectUser, t }: UserSidebarProps) {
  return (
    <div className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent">
      {/* Título de la lista de usuarios */}      
      {/* Lista de usuarios */}
      {birthdays.map((birthday) => (
        <motion.button
          key={birthday.id}
          onClick={() => handleSelectUser(birthday)}
          className="flex items-center w-full text-left p-2 hover:bg-accent hover:text-accent-foreground rounded transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Imagen de perfil del usuario */}
          <Image
            src={`/userlogo/${birthday.gender}.png`}
            alt={birthday.name}
            width={32}
            height={32}
            className="rounded-full mr-2"
          />
          {/* Nombre del usuario */}
          <span>{birthday.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
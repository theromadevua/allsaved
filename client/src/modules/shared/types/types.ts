export interface User {
    name: string;
    email: string;
  }
  
  export interface ProfileData {
    bio?: string;
    location?: string;
    website?: string;
    joinDate: string;
  }
  
  export interface ProfileCardProps {
    user: User | null;
    profileData: ProfileData;
    onUpdateProfile: (data: Partial<ProfileData>) => void;
  }
  
  export interface ProfileInfoItemProps {
    label: string;
    value: string;
    isEditing?: boolean;
    inputType?: 'text' | 'url' | 'textarea';
    editValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
  }
  
  export interface ProfileHeaderProps {
    user: User;
    isEditing: boolean;
    onEditToggle: () => void;
  }
  
  export interface ProfileActionsProps {
    onSave: () => void;
    onCancel: () => void;
  }
  
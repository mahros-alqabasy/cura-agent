
import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '../../../components/ui/checkbox';

interface TermsAgreementProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const TermsAgreement = ({ checked, onCheckedChange }: TermsAgreementProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="agreeToTerms"
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value as boolean)}
      />
      <label
        htmlFor="agreeToTerms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I agree to the{" "}
        <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
        {" "}and{" "}
        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
      </label>
    </div>
  );
};

export default TermsAgreement;

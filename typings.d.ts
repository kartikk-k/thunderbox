type OrgType = {
    id: string;
    name: string;
    created_at: string;
  };
  
  type Member = {
    id: string;
    created_at: string;
    role: string;
    user_id: string;
    org_id: string;
    orgs?: OrgType
  };